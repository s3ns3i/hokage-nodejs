// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const nodemailer = require('nodemailer');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const usersEmails = context.params.usersEmails;
    if(!usersEmails.length) {
      console.log('no mails to send');
      return context;
    }
    const config = require('config');
    const transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // upgrade later with STARTTLS
      auth: {
        user: config.get('mail.username'),
        pass: config.get('mail.password')
      }
    });
    transport.verify(function(error) {
      if (error) {
        throw new Error(error);
      }
    });

    console.log('sending emails to:');
    console.log(usersEmails);
    const task = context.result;
    const project = await context.app.service('project').get(task.projectId);
    usersEmails.forEach(async usersEmail => {
      try {
        var message = {
          from: 'wantedteam.scanlations@gmail.com',
          to: usersEmail,
          subject: `Hokage - ${project.name} ${task.chapterNo}`,
          html: `<p>Rozdział ${task.chapterNo}: ${task.name}</p>`
        };
        await transport.sendMail(message);
      } catch(error) {
        throw new Error(error);
      }
    });

    return context;
  };
};
