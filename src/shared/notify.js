import nodemailer from 'nodemailer';

export const notify = async (params) => {
    const {
        to,
        subject,
        html,
        from
    } = params
    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'thefutsalpro@gmail.om',
            pass: 'kfql fvpb fbcn fagh'
        }
    })

    const info = await transport.sendMail({
        from: from || 'TheFutsalPro <admin.thefutsalpro.com>',
        to: to,
        subject: subject,
        html: html
    })
    console.log("++++++++++++++++", info?.messageId)
}