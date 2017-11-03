import '../style';
import React from 'react';
import PropTypes from 'prop-types';
import Sessionstorage from 'sessionstorage';
import Cookies from 'js-cookie';
import Jquery from 'jquery';


if(!window.APP_CONFIG){
  window.APP_CONFIG = {};
}

(function(strUrl){
  const RGE_TEST = new RegExp('test');
  const RGE_LOCALHOST = new RegExp('localhost');
  const RGE_LOCALHOST2 = new RegExp('127.0.0.1');

  if(RGE_TEST.test(strUrl)){
    window.Domain = ".test.goago.cn";
  }else if(RGE_LOCALHOST.test(strUrl) || RGE_LOCALHOST2.test(strUrl)) {
    window.Domain = ".test.goago.cn"
  }else{
    window.Domain = ".gooagoo.com";
  }

})(window.location.origin);

class SystemNotice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      marqueeHtml: '',
      hspace: 0,//跑马区域与其它区域间的空白大小
      vspace: 0,//跑马区域与其它区域间的空白大小
      scrolldelay: 500, //跑马延时：毫秒数，利用它可实现跃进式滚动
      scrollamount: 30, //跑马速度：数越大越快
      width: '100%',// 跑马范围：宽为100%
      height: '100%',// 跑马范围：高为100%
      loop: 100,//跑马范围：宽为100%，高为200像素
    };
  }

  _getNotice() {
    let _self = this;
    let marqueeHtml = '';
    let postData = {};
    postData['entryId'] = this.props.entryId;
    postData['sso_token'] = Cookies.get(this.props.cookie_token_key) || 'misUser1BS745LFI7G4ON0034GMGC9LB8D0OR8D';

    Jquery.ajax({
        type: "GET",
        url: _self.props.defaultOptions.url,
        dataType: 'json',
        data: postData,
        xhrFields: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    ).done((resp) => {

        if ((resp.status == 'S' || resp.status == 'success') && resp.data && resp.data.msg) {
          let msg = resp.data.msg || '';
          let html = '<marquee bgcolor=' + this.props.bgcolor + ' scrollamount=' + this.props.scrollamount + ' direction=' + this.props.direction + ' behavior=' + this.props.behavior + '>' + msg + '</marquee>';
          this.setState({
            visible: true,
            marqueeHtml: html
          });
        } else {
          this.setState({
            visible: false
          });
        }
      }
    ).fail((jqXHR, textStatus) => {
        this.setState({
          visible: false
        });
      }
    );
  }

  _closeNoticeTips = () => {
    this.setState({
      visible: false
    });
    Sessionstorage.setItem('noticeVisible', false);
  }

  componentDidMount() {
    this._getNotice();
  }

  render() {
    let noticeVisible = false;

    if (Sessionstorage.getItem('noticeVisible') && Sessionstorage.getItem('noticeVisible') == 'false') {
      noticeVisible = false;
    } else {
      noticeVisible = this.state.visible;
    }

    return (
      <div id="system-notice" style={{display: noticeVisible ? 'block' : 'none'}}>
        <div className="notice-icon">
          <i type="notification"></i>
        </div>
        <div className="marquee" dangerouslySetInnerHTML={{__html: this.state.marqueeHtml}}>
        </div>
        <div className="notice-close">
          <i type="close" onClick={this._closeNoticeTips}></i>
        </div>
      </div>
    );
  }
}


SystemNotice.defaultProps = {
  bgcolor: '#FCF8E3', // 跑马区域的背景颜色
  scrollamount: 4, //跑马速度：数越大越快
  direction: 'left',//left, right 跑马方向：从左向右，从右向左
  behavior: 'scroll',//scroll, slide, alternate 跑马方式：循环绕行，只跑一次就停住，来回往复运动
  entryId: '05',//应用ID
  cookie_token_key: 'com.gooagoo.passpart.sso.token.name', //cookie 的 token key值
  defaultOptions: {
    url: 'http://misi'+ window.Domain +'/notify/getNotify.do',
    method: 'get',
    type: 'json',
    withCredentials: false, //设置跨域请求Cookies
    timeout: 30000,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
};

SystemNotice.propTypes = {
  bgcolor: PropTypes.string,
  scrollamount: PropTypes.number,
  direction: PropTypes.string,
  behavior: PropTypes.string,
  entryId: PropTypes.string,
  cookie_token_key: PropTypes.string,
  defaultOptions: PropTypes.object
};

export default SystemNotice;

