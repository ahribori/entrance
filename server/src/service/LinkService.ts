import uniqueString = require('unique-string');
import Link from 'db/model/Link';

class LinkService {
  private static instance: LinkService;

  private constructor() {}

  static getInstance(): LinkService {
    if (!LinkService.instance) {
      LinkService.instance = new LinkService();
    }
    return LinkService.instance;
  }

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

export default LinkService;
