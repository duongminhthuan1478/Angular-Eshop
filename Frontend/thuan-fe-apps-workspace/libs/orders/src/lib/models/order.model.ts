import { User } from '@thuan-fe-apps-workspace/users';
import { OrderItem } from "./order-item.model";

export class Order {
    id?: string;
    orderItems?: OrderItem[];
    shippingAddress1?: string;
    shippingAddress2?: string;
    city?: string;
    zip?: string;
    country?: string;
    phone?: string;
    status?: string;
    totalPrice?: number;
    user?: User | any; // when get order, we need all infor from user, but when post an order request, we need only id
    dateOrdered?: string;
}