import uniqueString = require('unique-string');
import Link from '../db/model/Link';

class LinkService {
  linkAccount(accountId: number) {
    return {
      toApplication: async (applicationId: number) => {
        return await Link.create({
          id: uniqueString(),
          accountId,
          applicationId,
        });
      },
    };
  }

  unlinkAccount(accountId: number) {
    return {
      fromApplication: async (applicationId: number) => {
        return await Link.destroy({
          where: {
            accountId,
            applicationId,
          },
        });
      },
    };
  }
}

export default new LinkService();
