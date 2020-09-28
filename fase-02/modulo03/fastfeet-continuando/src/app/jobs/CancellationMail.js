import Mail from '../../lib/Mail';

class CancellationMail {
    get key() {
        return 'CancellationMail';
    }

    async handle({ data }) {
        const { deliveryman, deliveryProblem, delivery } = data;

        await Mail.sendMail({
            to: `${deliveryman.name} <${deliveryman.email}>`,
            subject: 'Encomenda cancelada',
            template: 'cancellation',
            context: {
                product: delivery.product,
                product_id: delivery.id,
                description: deliveryProblem.description,
            },
        });
    }
}

export default new CancellationMail();
