import React from 'react';
import ReactDOM from 'react-dom';
import SystemNotice from '../src';

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 3 < 1,
  });
}

const targetKeys = mockData
        .filter(item => +item.key % 3 > 1)
        .map(item => item.key);

class App extends React.Component {
  state = {
    targetKeys,
    selectedKeys: [],
  }

  handleChange = (nextTargetKeys, direction, moveKeys) => {
    this.setState({ targetKeys: nextTargetKeys });

    console.log('targetKeys: ', targetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
  }

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });

    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  }

  handleScroll = (direction, e) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  }

  render() {
    const state = this.state;
    return (
      <SystemNotice></SystemNotice>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('sk-root'));
