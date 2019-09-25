



// 在小程序中调用这个云函数前，我们还需要先将该云函数部署到云端。在云函数目录上右键，在右键菜单中，我们可以将云函数整体打包上传并部署到线上环境中。

// 部署完成后，我们可以在小程序中调用该云函数：

// wx.cloud.callFunction({
//   // 云函数名称
//   name: 'add',
//   // 传给云函数的参数
//   data: {
//     a: 1,
//     b: 2,
//   },
//   success: function (res) {
//     console.log(res.result) // 3
//   },
//   fail: console.error
// })
// 当然，Promise 风格的调用也是支持的：

// wx.cloud.callFunction({
//   // 云函数名称
//   name: 'add',
//   // 传给云函数的参数
//   data: {
//     a: 1,
//     b: 2,
//   },
// })
//   .then(res => {
//     console.log(res.result) // 3
//   })
//   .catch(console.error)
// 那么到这里，我们就成功创建了我们的第一个云函数，并在小程序中成功调用！