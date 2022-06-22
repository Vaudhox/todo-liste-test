import * as sgMail from '@sendgrid/mail';
import { UserEntity } from 'src/users/entity/users.entity';
import { configService } from '../../config/config.service';
sgMail.setApiKey(configService.getValue("SENDGRID_API_KEY"))


export async function sendEmail(msg) {
    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent to ' + msg.to)
    })
    .catch((error) => {
        console.error(error)
    })
}


export async function sendEmailCheckEmail(user: UserEntity) {
    const msg = {
        to: user.email,
        from: 'nicolas.briere@hotmail.fr',
        subject: 'Vérification de votre mail',
        templateId: 'd-367417502e1c498f909f9203f6307c1a',
        dynamicTemplateData: {
          firstName: user.firstName,
          url: "http://localhost:3000/checkEmail?token=" + user.tokenCheckYourEmail+ "&id=" + user.id
        },
    }
    await sendEmail(msg)
}


