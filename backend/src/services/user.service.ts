import { prisma } from '../config/prisma.js';
import { SyncUserInput, UpdateUserInput } from '../schemas/user.schema.js';
import { NotFoundError, ConflictError } from '../utils/errors.js';

/**
 * UserService — all user-related business logic lives here.
 * The controller calls services; services call Prisma.
 * This enforces SRP: the controller handles HTTP, the service handles logic.
 */
export class UserService {
  /**
   * Syncs a Clerk user into our database after they sign up.
   * Idempotent — safe to call multiple times for the same clerkId.
   */
  async syncUser(clerkId: string, input: SyncUserInput) {
    const existing = await prisma.user.findUnique({ where: { clerkId } });
    if (existing) return existing;

    const emailTaken = await prisma.user.findUnique({ where: { email: input.email } });
    if (emailTaken) {
      throw new ConflictError(`Email ${input.email} is already registered to another account`);
    }

    return prisma.user.create({
      data: {
        clerkId,
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        avatarUrl: input.avatarUrl,
      },
    });
  }

  /**
   * Fetches the current user's full profile.
   */
  async getUserByClerkId(clerkId: string) {
    const user = await prisma.user.findUnique({
      where: { clerkId },
      include: { company: { select: { id: true, name: true, slug: true, logoUrl: true } } },
    });
    if (!user) throw new NotFoundError('User');
    return user;
  }

  /**
   * Updates a user's profile. Only the user themselves can do this
   * (enforced at the controller layer via Clerk ID comparison).
   */
  async updateUser(clerkId: string, input: UpdateUserInput) {
    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user) throw new NotFoundError('User');

    return prisma.user.update({
      where: { clerkId },
      data: { ...input },
    });
  }
}

// Export a singleton instance
export const userService = new UserService();
