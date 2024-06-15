import { CreateTraineeDTO, UpdateTraineeDTO } from '../dtos/trainee.dto';
import { ConflictError } from '../errors/ConflictError';
import { NotFoundError } from '../errors/NotFoundError';
import { Bcrypt } from '../helpers/Bcrypt';
import { TraineeWithoutPassword } from '../helpers/ExcludePassword';
import prisma from '../infrastructure/database/prisma';
import { Prisma, Trainee } from '@prisma/client';

class TraineeService {
  async createTrainee(data: CreateTraineeDTO) {
    let duplicate = await this.checkDuplicate(data.parcode, data.phoneNumber);

    if (duplicate)
      throw new ConflictError('Phone Number or parcode is already in use');

    const classes = data.subscriptionMonths * data.subscriptionClasses;

    const trainee = {
      ...data,
      // modify data to accepted by service
      subscriptionClasses: classes,
      remainingClasses: classes,
      password: await Bcrypt.hash(data.phoneNumber),
      dob: new Date(data.dob),
      subscriptionDate: new Date(Date.now()),
      subscriptionStartDate: new Date(data.subscriptionStartDate),
      subscriptionEndDate: new Date(
        new Date(data.subscriptionStartDate).setMonth(
          new Date(data.subscriptionStartDate).getMonth() +
            data.subscriptionMonths
        )
      ),
      // idFace: `trainees/${data.idFace[0].filename}`,
      // idBack: `trainees/${data.idBack[0].filename}`,
    };
    return await prisma.trainee.create({ data: trainee });
  }

  async checkDuplicate(parcode: string, phoneNumber: string) {
    return await prisma.trainee.findFirst({
      where: {
        OR: [{ parcode }, { phoneNumber }],
      },
      select: TraineeWithoutPassword,
    });
  }

  async getTrainees() {
    return await prisma.trainee.findMany({ select: TraineeWithoutPassword });
  }

  async getTraineeById(id: number) {
    return await prisma.trainee.findUnique({
      where: { id },
      include: { inBodies: true },
    });
  }

  async getTraineeByParcode(parcode: string) {
    return await prisma.trainee.findUnique({
      where: { parcode },
    });
  }

  async updateTrainee(id: number, dto: UpdateTraineeDTO) {
    const found = await this.getTraineeById(id);

    if (!found) {
      throw new NotFoundError('Trainee not found');
    }

    let duplicate = await this.checkDuplicate(dto.parcode, dto.phoneNumber);
    if (duplicate) {
      throw new ConflictError('Phone Number or parcode is already in use');
    }

    const data: Prisma.TraineeUpdateInput = {
      ...dto,
      dob: dto.dob ? new Date(dto.dob) : undefined,
      subscriptionStartDate: dto.subscriptionStartDate
        ? new Date(dto.subscriptionStartDate)
        : undefined,
      subscriptionEndDate: dto.subscriptionStartDate
        ? new Date(
            new Date(dto.subscriptionStartDate).setMonth(
              new Date(dto.subscriptionStartDate).getMonth() +
                (dto.subscriptionMonths || 0)
            )
          )
        : undefined,
      subscriptionMonths:
        dto.subscriptionMonths !== undefined
          ? +dto.subscriptionMonths
          : undefined,
      subscriptionClasses:
        dto.subscriptionClasses !== undefined
          ? +dto.subscriptionClasses
          : undefined,
      remainingClasses:
        dto.subscriptionClasses !== undefined
          ? +dto.subscriptionClasses
          : undefined,
      paid: dto.paid !== undefined ? +dto.paid : undefined,
      reminder: dto.reminder !== undefined ? +dto.reminder : undefined,
      idFace: dto.idFace ? `trainees/${dto.idFace[0].filename}` : undefined,
      idBack: dto.idBack ? `trainees/${dto.idBack[0].filename}` : undefined,
    };

    return await prisma.trainee.update({
      where: { id },
      data: data,
    });
  }

  async deleteTrainee(id: number) {
    return await prisma.trainee.delete({ where: { id } });
  }
}

export default new TraineeService();
