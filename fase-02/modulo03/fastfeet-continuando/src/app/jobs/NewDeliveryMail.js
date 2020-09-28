import Mail from '../../lib/Mail';

class NewDeliveryMail {
    get key() {
        return 'NewDeliveryMail';
    }

    async handle({ data }) {
        const { delivery, recipient, deliveryman } = data;
        console.log(delivery, recipient, deliveryman);
        await Mail.sendMail({
            to: `${deliveryman.name} <${deliveryman.email}>`,
            subject: 'Nova encomenda',
            template: 'newdelivery',
            context: {
                deliveryman: deliveryman.name,
                delivery: delivery.product,
                recipient: recipient.name,
                street: recipient.street,
                number: recipient.number,
                complement: recipient.complement,
                state: recipient.state,
                city: recipient.city,
                postcode: recipient.postcode,
            },
        });
    }
}

export default new NewDeliveryMail();
