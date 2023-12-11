import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      page: 1,
      totalPage: null,
      isLoading: false,
    };
  }

  addPage(page) {
    this.setState(
      {
        ...this.getState(),
        page,
      },
      "Обновлен номер страницы"
    );
  }

  async load(page) {
    if(page === null) page = 1;
    
    const limit = 10;
    const skip = 10 * (+page - 1);

    this.setState({
      ...this.getState(), 
      page: +page,
      isLoading: true
    });

    const response = await fetch(
      `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`
    );
     const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        totalPage: Math.ceil(json.result.count / limit),
        isLoading: false,
      },
      "Загружены товары из АПИ"
    );
  }
}

export default Catalog;
