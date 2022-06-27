import * as sgMail from '@sendgrid/mail';
import { ListEntity } from '../../lists/entity/lists.entity';
import { UserEntity } from '../../users/entity/users.entity';
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
          url: configService.getValue("FRONT_URL") + "/checkEmail?token=" + user.tokenCheckYourEmail+ "&id=" + user.id
        },
    }
    await sendEmail(msg)
}

export async function sendEmailReminderList(user: UserEntity, list: ListEntity) {
    const msg = {
        to: user.email,
        from: 'nicolas.briere@hotmail.fr',
        subject: 'Rappel H-24',
        templateId: 'd-570a815cc690432c8a452954386fff8b',
        dynamicTemplateData: {
          name: user.firstName,
          listname: list.title,
          lien: configService.getValue("FRONT_URL") + "/list/" + list.id
        },
    }
    await sendEmail(msg)
}

