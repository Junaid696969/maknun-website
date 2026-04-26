export default {
  name: 'restockRequest',
  title: 'Restock Requests',
  type: 'document',
  fields: [
    { name: 'email', title: 'Customer Email', type: 'string', readOnly: true },
    { name: 'productName', title: 'Product Name', type: 'string', readOnly: true },
    { name: 'productId', title: 'Product ID', type: 'string', readOnly: true },
    { name: 'createdAt', title: 'Requested At', type: 'datetime', readOnly: true },
  ],
}