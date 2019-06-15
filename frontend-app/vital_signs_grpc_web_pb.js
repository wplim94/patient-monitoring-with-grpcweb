/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = require('./vital_signs_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.VitalSignsServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.VitalSignsServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.RegisterDeviceRequest,
 *   !proto.RegisterDeviceResponse>}
 */
const methodInfo_VitalSignsService_registerDevice = new grpc.web.AbstractClientBase.MethodInfo(
  proto.RegisterDeviceResponse,
  /** @param {!proto.RegisterDeviceRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.RegisterDeviceResponse.deserializeBinary
);


/**
 * @param {!proto.RegisterDeviceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.RegisterDeviceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.RegisterDeviceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.VitalSignsServiceClient.prototype.registerDevice =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/VitalSignsService/registerDevice',
      request,
      metadata || {},
      methodInfo_VitalSignsService_registerDevice,
      callback);
};


/**
 * @param {!proto.RegisterDeviceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.RegisterDeviceResponse>}
 *     A native promise that resolves to the response
 */
proto.VitalSignsServicePromiseClient.prototype.registerDevice =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/VitalSignsService/registerDevice',
      request,
      metadata || {},
      methodInfo_VitalSignsService_registerDevice);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.VitalSigns,
 *   !proto.VitalSignsResponse>}
 */
const methodInfo_VitalSignsService_publishData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.VitalSignsResponse,
  /** @param {!proto.VitalSigns} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.VitalSignsResponse.deserializeBinary
);


/**
 * @param {!proto.VitalSigns} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.VitalSignsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.VitalSignsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.VitalSignsServiceClient.prototype.publishData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/VitalSignsService/publishData',
      request,
      metadata || {},
      methodInfo_VitalSignsService_publishData,
      callback);
};


/**
 * @param {!proto.VitalSigns} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.VitalSignsResponse>}
 *     A native promise that resolves to the response
 */
proto.VitalSignsServicePromiseClient.prototype.publishData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/VitalSignsService/publishData',
      request,
      metadata || {},
      methodInfo_VitalSignsService_publishData);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.SubscribeDataRequest,
 *   !proto.VitalSigns>}
 */
const methodInfo_VitalSignsService_subscribeData = new grpc.web.AbstractClientBase.MethodInfo(
  proto.VitalSigns,
  /** @param {!proto.SubscribeDataRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.VitalSigns.deserializeBinary
);


/**
 * @param {!proto.SubscribeDataRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.VitalSigns>}
 *     The XHR Node Readable Stream
 */
proto.VitalSignsServiceClient.prototype.subscribeData =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/VitalSignsService/subscribeData',
      request,
      metadata || {},
      methodInfo_VitalSignsService_subscribeData);
};


/**
 * @param {!proto.SubscribeDataRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.VitalSigns>}
 *     The XHR Node Readable Stream
 */
proto.VitalSignsServicePromiseClient.prototype.subscribeData =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/VitalSignsService/subscribeData',
      request,
      metadata || {},
      methodInfo_VitalSignsService_subscribeData);
};


module.exports = proto;

