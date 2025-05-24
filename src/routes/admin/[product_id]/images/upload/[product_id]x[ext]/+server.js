import { MODE } from "$env/static/private";
import { dbFunctions } from "$lib/db/database";
import { randomUUID } from "crypto";
import * as fs from "fs";


export const POST = (async ({ params, request }) => {
    const stream = request.body;
    const product_id = params.product_id;
    const ext = params.ext;

    if (!product_id) return new Response('No product id', { status: 400 });
    if (!stream) return new Response('No body received', { status: 400 });
    if (!ext) return new Response('No ext received', { status: 400 });

    const [product] = await dbFunctions.getProductById(product_id);

    if (!product) return new Response('No product found', { status: 400 });

    const random = randomUUID();
    let tempFolder = "~/Documents/Image-Server/static/products";

    if (MODE == "DEVELOPMENT") {
        tempFolder = "static/products/";
    }
    
    const filename = `product${product_id}_${random}.${ext}`;

    const diskStream = fs.createWriteStream(tempFolder + filename);

    diskStream.on('error', (err) => {
        console.log('Stream error:', err);
    });

    const writeableStream = new WritableStream({
        start() {
            console.log('Stream started');
        },
        write(chunk) {
            diskStream.write(chunk);
        },
        close() {
            console.log('Stream closed');
            diskStream.end();
        },
        abort() {
            console.log('Stream aborted');
            diskStream.end();
        }
    });

    const success = await new Promise((resolve) =>
        stream
            .pipeTo(writeableStream)
            .then(() => resolve(true))
            .catch(() => resolve(false))
    );

    if (success) {
        await dbFunctions.addImage(product_id, filename, product.description);
        return new Response("Uploaded Successfully!", { status: 200 });
    }
    else {
        return new Response("Something went wrong", { status: 500 });
    }
})