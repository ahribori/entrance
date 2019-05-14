import MailService from '../../src/service/MailService';

describe('MailService tests', () => {
  test('Send mail', async () => {
    const sendResult = await MailService.sendMail({
      from: 'Entrance <entrance.auth@gmail.com>',
      to: 'entrance.auth@gmail.com',
      subject: '테스트',
      html: '<p>Hello, world!</p>',
    });
    console.log(sendResult);
  });
});
