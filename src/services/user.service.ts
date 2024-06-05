import prisma from '../infrastructure/database/prisma';

class UserService {
  async findUserByPhoneNumber(phoneNumber: string) {
    const coach = await prisma.coach.findUnique({ where: { phoneNumber } });
    if (coach) return { ...coach, userType: 'COACH' };

    const secretary = await prisma.secretary.findUnique({
      where: { phoneNumber },
    });
    if (secretary) return { ...secretary, userType: 'SECRETARY' };

    const trainee = await prisma.trainee.findUnique({ where: { phoneNumber } });
    if (trainee) return { ...trainee, userType: 'TRAINEE' };

    return null;
  }
}

export default new UserService();
