import { Renderable } from "strontium/lib/src"

export class GoliathResponse<R> extends Renderable {
    constructor(private data: R) {
        super()
    }

    async render(): Promise<any> {
        let data = this.data

        // If data is Renderable then call it's render method
        if (data instanceof Renderable) {
            data = await data.render()
        }

        return {
            meta: {},
            data,
        }
    }
}
