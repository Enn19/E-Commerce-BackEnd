import Stripe from "stripe"
async function payment({
    stripe = new Stripe(process.env.API_KEY_PAYMENT),
    mode = "payment",
    payment_method_types = ["card"],
    success_url = process.env.SUCCESS_URL,
    cancel_url = process.env.CANCEL_URL,
    discounts = [],
    customer_email,
    line_items = [],
    metadata = {}
} = {}) {
    const session = await stripe.checkout.sessions.create({
        mode,
        payment_method_types,
        metadata,
        success_url,
        cancel_url,
        discounts,
        customer_email,
        line_items
    })
    return session
}
export default payment
