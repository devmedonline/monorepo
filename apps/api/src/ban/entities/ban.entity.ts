import { Ban as PrismaBan } from '@prisma/client';

export class Ban {
  static stillBanned(lastBan: PrismaBan): boolean {
    if (lastBan) {
      const now = new Date();
      const unBannedAt = new Date(lastBan.unBanTimestamp);

      const banEnd = new Date(
        lastBan.banTimestamp.getFullYear(),
        lastBan.banTimestamp.getMonth(),
        lastBan.banTimestamp.getDate() + lastBan.banDurationInDays,
      );

      // Ban removed
      if (unBannedAt <= now) return false;

      // Ban still active
      if (now <= banEnd) {
        return true;
      }

      // Ban expired
      if (now > banEnd) {
        return false;
      }

      // Ban not yet active
      return false;
    }
  }
}
