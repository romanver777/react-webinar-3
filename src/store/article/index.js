import StoreModule from "../module";

class Article extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      article: null
    }
  }

  async load(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=title,description,price,edition,madeIn(title,code),category(title)`);
    const json = await response.json();

    this.setState({
      ...this.getState(),
      article: json.result
    }, 'Загружен товар из АПИ');
  }
}

export default Article;
