import { dbFunctions } from "$lib/db/database";
import { profileEditor } from "$lib/functions/profile-editor";
import { fail } from "@sveltejs/kit";

export async function load({locals}) {
    let cards = await dbFunctions.getUserCards(locals.user.user_id);

    cards = [
        {
            card_id: 1,
            user_id: locals.user.user_id,
            object: "CARD",
            brand: "MASTERCARD",
            first_six_digits: "5779",
            last_four_digits: "6771",
        },
        {
            card_id: 2,
            user_id: locals.user.user_id,
            object: "CARD",
            brand: "MASTERCARD",
            first_six_digits: "5779",
            last_four_digits: "6772",
        },
        {
            card_id: 3,
            user_id: locals.user.user_id,
            object: "CARD",
            brand: "MASTERCARD",
            first_six_digits: "5779",
            last_four_digits: "6773",
        },
    ]

    return {cards};
}

export const actions = {
    delete: async ({locals, request, params}) => {
        const data = await request.formData();
        let cards = data.get("cards");
        const multiple = data.get("multiple-selected");

        if (!multiple) {
            cards = [cards];
        }

        const [user] = await dbFunctions.getUserByID(locals.user.user_id);

        if (!user) {
            return fail(404, {
                invalid: true,
                message: "user not found"
            });
        }

        if (!user.tap_customer_id) {
            return fail(404, {
                invalid: true,
                message: "user not found"
            });
        }

        const cardsForDeletion = [];

        for (let i = 0; i < cards.length; i++) {
            const [cardForComparison] = await dbFunctions.getCardById(cards[i]);

            if (!cardForComparison) {
                return fail(404, {
                    invalid: true,
                    message: "one or more cards not found"
                });
            }

            if (cardForComparison.user_id != user.user_id) {
                return fail(404, {
                    invalid: true,
                    message: "one or more cards not found"
                });
            }

            cardsForDeletion.push(cards[i]);
        }

        for (let i = 0; i < cardsForDeletion.length; i++) {
            await profileEditor.deleteCardFromTap(
                user.tap_customer_id,
                cardsForDeletion[i]
            );

            await dbFunctions.deleteCard(cardsForDeletion[i]);
        }

        return {
            success: true, 
            message:"deleted cards successfully"
        }
    }
}