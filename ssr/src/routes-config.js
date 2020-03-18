import React from 'react';

class Detail extends React.Component {
  render() {
    return <div>detail</div>;
  }
}

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  //数据预取方法  静态 异步 方法
  static async getInitialProps(opt) {
    const fetch1 = await fetch('/xxx.com/a');
    const fetch2 = await fetch('/xxx.com/b');

    return {
      res: [fetch1, fetch2]
    };
  }

  render() {
    return <h1>{this.props.data.title}</h1>;
  }
}

const routes = [
  {
    path: '/',
    exact: true,
    component: Index
  },
  {
    path: '/detail',
    exact: true,
    component: Detail
  },
  {
    path: '/detail/:a/:b',
    exact: true,
    component: Detail
  }
];

//导出路由表
export default routes;
