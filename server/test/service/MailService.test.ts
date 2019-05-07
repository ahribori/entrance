import MailService from 'service/MailService';

describe('MailService tests', () => {
  const mailService = MailService.getInstance();

  test('Send mail', async () => {
    const sendResult = await mailService.sendMail({
      from: 'Entrance <entrance.auth@gmail.com>',
      to: 'entrance.auth@gmail.com',
      subject: '테스트',
      html: '<p>Hello, world!</p>',
    });
    console.log(sendResult)
  });
});
