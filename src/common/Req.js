import axios from 'axios';
import {Toast} from 'native-base';

export function Req(v, s) {
  return v;
}
export async function Auth(url, data = null) {
  let res = null;

  const form = new FormData();
  async function lo() {
    if (data !== null) {
      for (let i = 0; i < data.length; i++) {
        form.append(data[i].t, data[i].v);
      }
    }
  }
  console.log(data);
  async function get() {
    await axios({
      method: 'POST',
      url: url,
      data: form,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(json => {
        if (json.status === 200) {
          res = {stat: true, data: json.data.log.data};
        } else {
          res = {stat: false, data: []};
          Toast.show({title: json.data.log.message});
        }
        console.log(json.status);
      })
      .catch(error => {
        res = {stat: false, data: []};
        if (error.response !== undefined) {
          Toast.show({title: error.response.data.error});
        } else {
          Toast.show({title: 'Down'});
        }

        console.error(error);
      });
  }
  await lo();
  await get();

  return res;
}

export async function Post(url, datas = null, header = null) {
  let res = null;

  const form = new FormData();
  async function lo() {
    if (datas !== null) {
      for (let i = 0; i < datas.length; i++) {
        form.append(datas[i].t, datas[i].v);
      }
    }
  }
  console.log(header);
  async function get() {
    await axios({
      method: 'POST',
      url: url,
      data: form,
      headers:
        header !== null
          ? {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + header,
            }
          : {
              'Content-Type': 'multipart/form-data',
            },
    })
      .then(json => {
        //return json.movies;

        if (json.status === 200) {
          res = {stat: true, data: json};
        } else {
          res = {stat: false, data: []};
        }
        console.log(json);
      })
      .catch(error => {
        console.error(error);
      });
  }
  await lo();
  await get();

  return res;
}

export async function Get(url, header = null) {
  let res = null;
  async function get() {
    await axios({
      method: 'get',
      url: url,
      headers:
        header !== null
          ? {
              Authorization: 'Bearer ' + header,
            }
          : {},
    })
      .then(json => {
        //return json.movies;

        if (json.status === 200) {
          res = {stat: true, data: json.data};
        } else {
          res = {stat: true, data: json.data};
        }
        console.log(json);
      })
      .catch(error => {
        res = {stat: false, data: []};
        if (error.response.data.message !== undefined) {
          Toast.show({title: error.response.data.message});
        } else {
          Toast.show({title: 'Down'});
        }

        console.error(error);
      });
  }
  await get();

  return res;
}

export default {Req, Auth, Post, Get};
