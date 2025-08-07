// 簡單的數據管理工具
class DataManager {
  constructor() {
    this.data = {
      pain: null,
      sleep: null,
      tube: null,
      excretion: null
    };
  }

  // 保存疼痛數據
  savePainData(painData) {
    this.data.pain = {
      ...painData,
      timestamp: new Date().toISOString()
    };
    this.saveToStorage();
    return this.data.pain;
  }

  // 保存睡眠數據
  saveSleepData(sleepData) {
    this.data.sleep = {
      ...sleepData,
      timestamp: new Date().toISOString()
    };
    this.saveToStorage();
    return this.data.sleep;
  }

  // 保存管路數據
  saveTubeData(tubeData) {
    this.data.tube = {
      ...tubeData,
      timestamp: new Date().toISOString()
    };
    this.saveToStorage();
    return this.data.tube;
  }

  // 保存排泄數據
  saveExcretionData(excretionData) {
    this.data.excretion = {
      ...excretionData,
      timestamp: new Date().toISOString()
    };
    this.saveToStorage();
    return this.data.excretion;
  }

  // 獲取所有數據
  getAllData() {
    return this.data;
  }

  // 獲取特定類型的數據
  getData(type) {
    return this.data[type];
  }

  // 清除所有數據
  clearAllData() {
    this.data = {
      pain: null,
      sleep: null,
      tube: null,
      excretion: null
    };
    this.saveToStorage();
  }

  // 清除特定類型的數據
  clearData(type) {
    this.data[type] = null;
    this.saveToStorage();
  }

  // 檢查是否有數據
  hasData(type = null) {
    if (type) {
      return this.data[type] !== null;
    }
    return Object.values(this.data).some(data => data !== null);
  }

  // 獲取數據摘要
  getSummary() {
    const summary = {
      hasPain: this.data.pain !== null,
      hasSleep: this.data.sleep !== null,
      hasTube: this.data.tube !== null,
      hasExcretion: this.data.excretion !== null,
      totalAssessments: Object.values(this.data).filter(data => data !== null).length
    };
    return summary;
  }

  // 保存到本地存儲（模擬）
  saveToStorage() {
    try {
      // 在實際應用中，這裡會使用 AsyncStorage 或其他本地存儲方案
      console.log('數據已保存:', this.data);
    } catch (error) {
      console.error('保存數據失敗:', error);
    }
  }

  // 從本地存儲載入數據（模擬）
  loadFromStorage() {
    try {
      // 在實際應用中，這裡會從 AsyncStorage 載入數據
      console.log('載入數據:', this.data);
    } catch (error) {
      console.error('載入數據失敗:', error);
    }
  }

  // 導出數據為JSON
  exportData() {
    return JSON.stringify(this.data, null, 2);
  }

  // 從JSON導入數據
  importData(jsonData) {
    try {
      this.data = JSON.parse(jsonData);
      this.saveToStorage();
      return true;
    } catch (error) {
      console.error('導入數據失敗:', error);
      return false;
    }
  }
}

// 創建單例實例
const dataManager = new DataManager();

export default dataManager; 