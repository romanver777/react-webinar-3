import StoreModule from "../module";

class Basket extends StoreModule {

  initState() {
    return {
      list: [],
      sum: 0,
      amount: 0
    }
  }

  async load(id) {
    const response = await fetch(`/api/v1/articles/${id}`);
    const json = await response.json();
    
    return json.result;
  }

  /**
   * Добавление товара в корзину
   * @param _id Код товара
   */
  addToBasket(_id) {
    let sum = 0;
    let exist = false;

    const list = this.getState().list.map(item => {
      let result = item;

      if (item._id === _id) {
        exist = true;
        result = {...item, amount: item.amount + 1};
      }
      sum += result.price * result.amount;

      return result;
    });

    if (!exist) {    
      this.load(_id)
        .then((item) => {
          list.push({...item, amount: 1});    
          sum += item.price;
        })
        .then(() => {
          this.setState({
            ...this.getState(),
            list,
            sum,
            amount: list.length
          }, 'Добавление в корзину');
        })
        .catch((error) => console.log(error));
    }else{

      this.setState({
        ...this.getState(),
        list,
        sum,
        amount: list.length
      }, 'Добавление в корзину');
    }
  }

  /**
   * Удаление товара из корзины
   * @param _id Код товара
   */
  removeFromBasket(_id) {
    let sum = 0;
    const list = this.getState().list.filter(item => {
      if (item._id === _id) return false;
      sum += item.price * item.amount;
      return true;
    });

    this.setState({
      ...this.getState(),
      list,
      sum,
      amount: list.length
    }, 'Удаление из корзины');
  }
}

export default Basket;
