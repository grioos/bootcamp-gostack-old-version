import Mail from '../../lib/Mail';

class CancellationMail {
    get key() {
        return 'CancellationMail';
    }

    async handle({ data }) {
        const deliveryman = data;
        console.log(deliveryman);
        await Mail.sendMail({
            to: `${deliveryman.name} <${deliveryman.email}>`,
            subject: 'Encomenda cancelada',
            template: 'cancellation',
            context: {
                deliveryman: deliveryman.name,
                description: 'EU QUERO QUE VOCÊ SE AME SEU FILHO DE UMA ...',
            },
        });
    }
}

export default new CancellationMail();
