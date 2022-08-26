
// 取得先のURL
const url = "/schema/test";
export const state = () => ({
  //内容
  datas: null
});
export const mutations = {
  //内容
  // @ts-ignore
  async setDatas(state: { datas: any; }, { payload }) {
    state.datas = payload.data;
  }
};
export const actions = {
  //内容
  async getDatas({ commit }: any) {
    // @ts-ignore
    const response = await this.$axios.get(url);
    await commit('setDatas', {
      payload: {
        data: response.data,
      }
    })
  },
  async insertDatas({ dispatch }: any, data: any) {
    // @ts-ignore
    await this.$axios.post(url, data);
    // @ts-ignore
    await dispatch("getDatas");
  },
  async deleteDatas({ dispatch }: any, id: any) {
    // @ts-ignore
    await this.$axios.delete(url + '/' + id);
    // @ts-ignore
    await dispatch("getDatas");
  }
};
export const getters = {
  //内容
  alldatas: (state: { datas: any; }) => {
    return state.datas
  }
};
