import angular from 'angular';

class ajaxService {

  constructor($http) {
    'ngInject';
    this.$http = $http;
  }

  /**
   * Get CKAN instance information list
   * @return {object} response object
   */
  getInstances() {
    return this.$http
      .get('/api/instances')
      .then(result => {
        return result.data;
      });
  }

  /**
   * Get a summary of instances
   * @return {object} response object
   */
  getInstanceSummary() {
    return this.$http
      .get('/api/instances/summary')
      .then(result => {
        return result.data;
      });
  }

  /**
   * Get style definition.
   * @param  {integer} count   number of style classes
   * @return {object[]}             styles
   */
  getMapStyles(count) {
    return this.$http
      .get(`/api/map_styles/${count}`)
      .then(result => {
        return result.data;
      });
  }

  /**
   * [getInstanceInfo description]
   * @param  {integer} instanceID instance ID
   * @return {object}             instance info
   */
  getInstanceInfo(instanceID) {
    return this.$http
      .get(`/api/instance/${instanceID}`, {
        cache: true
      })
      .then(result => {
        return result.data;
      });
  }
}

ajaxService.$inject = ['$http'];

angular.module('OpenDataDiscovery').service('ajaxService', ajaxService);

export default ajaxService;
