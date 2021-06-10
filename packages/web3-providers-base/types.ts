import { EventEmitter } from 'events';
import { HttpOptions } from 'web3-providers-http/types';
import { EthFilter, EthTransaction } from 'web3-eth/types';
import { HexString, ValidTypesEnum } from 'web3-utils/types';

export type ProviderCallOptions = HttpOptions | undefined; // HttpOptions | WsOptions | IpcOptions
export type RpcParams = (
    | HexString
    | number
    | EthTransaction
    | boolean
    | EthFilter
)[];
export type RpcResponseResult =
    | string
    | number
    | boolean
    | (string | number)[]
    | { [key: string]: string | number }
    | BigInt
    | null
    | any;

export interface ProviderOptions {
    providerUrl: string;
}

export interface RpcOptions {
    id: number;
    jsonrpc: string;
    method: string;
    params: RpcParams;
}

export interface PartialRpcOptions extends Partial<RpcOptions> {
    method: string;
    params: RpcParams;
}

export interface CallOptions {
    providerCallOptions?: ProviderCallOptions;
    rpcOptions?: Partial<RpcOptions>;
    returnType?: ValidTypesEnum;
    subscribe?: boolean;
}

export interface SendOptions extends CallOptions {
    rpcOptions: PartialRpcOptions;
}

export interface RpcResponse {
    id: number;
    jsonrpc: string;
    result: RpcResponseResult;
}

export interface SubscriptionResponse {
    eventEmitter: EventEmitter;
    subscriptionId: number;
}

export interface IWeb3Provider {
    providerUrl: string;
    setProvider: (providerUrl: string) => void;
    send: (
        rpcOptions: RpcOptions,
        providerCallOptions: ProviderCallOptions
    ) => Promise<RpcResponse>;
    subscribe: (
        rpcOptions: RpcOptions,
        providerCallOptions: ProviderCallOptions
    ) => SubscriptionResponse;
    unsubscribe?: (eventEmitter: EventEmitter, subscriptionId: number) => void;
    disconnect?: () => void;
}