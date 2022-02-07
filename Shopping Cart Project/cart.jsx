// simulate getting products from DataBase
const products = [
  { name: "Apples", country: "Italy", cost: 3, instock: 10 },
  { name: "Oranges", country: "Spain", cost: 4, instock: 3 },
  { name: "Beans", country: "USA", cost: 2, instock: 5 },
  { name: "Cabbage", country: "USA", cost: 1, instock: 8 },
];
//=========Cart=============
const Cart = (props) => {
  const { Card, Accordion, Button } = ReactBootstrap;
  let data = props.location.data ? props.location.data : products;
  console.log(`data:${JSON.stringify(data)}`);

  return <Accordion defaultActiveKey="0">{list}</Accordion>;
};

const useDataApi = (initialUrl, initialData) => {
  const { useState, useEffect, useReducer } = React;
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });
  console.log(`useDataApi called`);
  useEffect(() => {
    console.log("useEffect Called");
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios(url);
        console.log("FETCH FROM URl");
        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [url]);
  return [state, setUrl];
};
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const Products = (props) => {
  const [items, setItems] = React.useState(products);
  const [cart, setCart] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const {
    Card,
    Accordion,
    Button,
    Container,
    Row,
    Col,
    Image,
    Input,
  } = ReactBootstrap;
  //  Fetch Data
  const { Fragment, useState, useEffect, useReducer } = React;
  const [query, setQuery] = useState("http://localhost:1337/api/products");
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    "http://localhost:1337/api/products",
    {
      data: [],
    }
  );
  // console.log(`Rendering Products ${JSON.stringify(data)}`);
  // Fetch Data
  const addToCart = (e) => {
    let name = e.target.name;
    let item = items.filter((item) => item.name == name);
    // console.log(`add to Cart ${JSON.stringify(item)}`);
    item[0].instock-=1
    console.log("revisar",data);
    console.log("items",items)
    setCart([...cart, ...item]);
    //doFetch(query);
  };
  const deleteCartItem = (index) => {
    let newCart = cart.filter((item, i) => index != i);
    setCart(newCart);
  };
  const photos = {Apples: "data:image/jpeg;base64,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", 
  Oranges:"https://produits.bienmanger.com/33285-0w470h470_Organic_Fresh_Oranges_From_Italy_New_Hall.jpg", 
  Beans: "https://www.jessicagavin.com/wp-content/uploads/2020/05/types-of-beans-1200.jpg", 
  Cabbage: "https://media.istockphoto.com/photos/green-cabbage-isolated-on-white-picture-id673162168?k=20&m=673162168&s=612x612&w=0&h=3QKF6zzzCAUL3pKxW6kVbZ7lUt1JUY_SchOUMyOHwhs="};

  let list = items.map((item, index) => {
    //let n = index + 1049;
    //let url = "https://picsum.photos/id/" + n + "/50/50";
    console.log("revisar item",)
    return (
      <li key={index}>
        <Image src={photos[item.name]} width={70} roundedCircle></Image>
        <Button variant="primary" size="large">
          Product: {item.name} Stock: {item.instock} Cost:{item.cost}
        </Button>
        <input name={item.name} type="submit" onClick={addToCart}></input>
      </li>
    );
  });
  let cartList = cart.map((item, index) => {
    return (
      <Card key={index}>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey={1 + index}>
            {item.name}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse
          onClick={() => deleteCartItem(index)}
          eventKey={1 + index}
        >
          <Card.Body>
            $ {item.cost} from {item.country}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  });

  let finalList = () => {
    let total = checkOut();
    let final = cart.map((item, index) => {
      return (
        <div key={index} index={index}>
          {item.name}
        </div>
      );
    });
    return { final, total };
  };

  const checkOut = () => {
    let costs = cart.map((item) => item.cost);
    const reducer = (accum, current) => accum + current;
    let newTotal = costs.reduce(reducer, 0);
    console.log(`total updated to ${newTotal}`);
    return newTotal;
  };
  // TODO: implement the restockProducts function
  const restockProducts = (url) => {
    doFetch(url);
    console.log("revasdasdisar" ,data.data);
    
      let newItems = data.data.map((item=>{
      console.log("item",item.attributes)
      let {name,country,cost,instock} = item.attributes;
      console.log(name);
      return {name, country,cost, instock};
    }))
    setItems([...items,...newItems]);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Product List</h1>
          <ul style={{ listStyleType: "none" }}>{list}</ul>
        </Col>
        <Col>
          <h1>Cart Contents</h1>
          <Accordion>{cartList}</Accordion>
        </Col>
        <Col>
          <h1>CheckOut </h1>
          <Button onClick={checkOut}>CheckOut $ {finalList().total}</Button>
          <div> {finalList().total > 0 && finalList().final} </div>
        </Col>
      </Row>
      <Row>
        <form
          onSubmit={(event) => {
            restockProducts(`http://localhost:1337/api/${query}`);
            console.log(`Restock called on ${query}`);
            event.preventDefault();
          }}
        >
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit">ReStock Products</button>
        </form>
      </Row>
    </Container>
  );
};
// ========================================
ReactDOM.render(<Products />, document.getElementById("root"));
