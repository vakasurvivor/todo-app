// script/data-service.js (両プロジェクトで利用する共通インターフェース)
export const DataService = {
  /**
   * TODOリストを取得。
   * @returns {Promise<object>} TODOリストの
   */
  async get() {},

  /**
   * TODOリストを全件取得。
   * @returns {Promise<Array>} TODOリストの配列
   */
  async getAll() {},

  /**
   * TODOリストを新規追加。
   * @param {string} text - TODOの内容
   * @returns {Promise<object>} 追加されたTODOリストオブジェクト
   */
  async add(text) {},

  /**
   * TODOリストを更新。
   * @param {number} id - 更新するTODOリストのID
   * @param {object} updates - 更新内容 { text?: string, is_completed?: boolean }
   * @returns {Promise<void>}
   */
  async update(id, updates) {},

  /**
   * TODOリストを削除。
   * @param {number} id - 削除するTODOリストのID
   * @returns {Promise<void>}
   */
  async delete(id) {},
};
