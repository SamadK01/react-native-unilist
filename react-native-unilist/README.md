# react-native-unilist

listx

## Installation

```sh
npm install react-native-unilist
```

## Usage

```js
import { UniList } from 'react-native-unilist';

// FlatList mode (with data)
<UniList
  data={[1, 2, 3]}
  renderItem={(item, index) => <Text>{item}</Text>}
/>

// ScrollView mode (with children)
<UniList>
  <Text>Child 1</Text>
  <Text>Child 2</Text>
</UniList>
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
