import { dbFunctions } from "$lib/db/database";

export const load = async ({ locals, params }) => {
    const size_chart_components = await dbFunctions.getSizeChartComponents(
        params.product_id
    );

    let size_chart_values = await dbFunctions.getSizeChartValues(params.product_id);

    const product_variation_options = await dbFunctions.getProductSizeOptions(
        params.product_id
    );

    let temp_values = {};

    for (let i = 0; i < size_chart_values.length; i++) {
        let option_id = size_chart_values[i].option_id;
        let component_id = size_chart_values[i].component_id;
        
        if (!temp_values[option_id]) {
            temp_values[option_id] = {}
        }

        temp_values[option_id][component_id] = size_chart_values[i];
    }

    return {
        size_chart_components, 
        size_chart_values: temp_values,
        product_variation_options
    }
}

export const actions = {
    submit: async ({ locals, cookies, request, params }) => {
        const data = await request.formData();

        const product_id = params.product_id;
        const above_text = data.get("above_text");
        let size_chart = data.get("size_chart");
        const below_text = data.get("below_text");

        size_chart = JSON.parse(size_chart);

        for (let option in size_chart) {
            for (let component in size_chart[option]) {
                await dbFunctions.updateSizeChartValue(
                    product_id,
                    option,
                    component,
                    size_chart[option][component]
                );
            }
        }

        dbFunctions.updateSizeChartText(product_id, above_text, below_text);

        return {
            success: true,
            message: "values updated successfully"
        }
    }
}