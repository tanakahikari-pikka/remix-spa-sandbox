import React from 'react';

interface SimpleButtonState {
  data: string | null;
}

export default class SimpleButton extends React.Component<{}, SimpleButtonState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: null,
    };
  }

  handleClick = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://54.95.200.201/', true);

    // CORSが問題になる場合はサーバー側で適切にヘッダーを設定する必要があります。

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        console.log('Data fetched:', xhr.responseText);  // 取得したデータをコンソールに表示
        this.setState({ data: xhr.responseText });
      } else {
        console.error('Error:', xhr.statusText);
        this.setState({ data: `Error: ${xhr.statusText}` });
      }
    };

    xhr.onerror = () => {
      console.error('Network error');
      this.setState({ data: 'Network error occurred.' });
    };

    xhr.send();
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Request !!</button>
        {/* データが取得されたら表示 */}
        {this.state.data && <div>{this.state.data}</div>}
      </div>
    );
  }
}
