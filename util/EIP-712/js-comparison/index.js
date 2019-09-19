const sigUtil = require('eth-sig-util')
const ethUtil = require('ethereumjs-util')
const utils = sigUtil.TypedDataUtils

const withGroup = {
	types: {
		EIP712Domain: [{
				name: 'name',
				type: 'string'
			},
			{
				name: 'version',
				type: 'string'
			},
			{
				name: 'chainId',
				type: 'uint256'
			},
			{
				name: 'verifyingContract',
				type: 'address'
			},
		],
		Person: [{
				name: 'name',
				type: 'string'
			},
			{
				name: 'wallets',
				type: 'address[]'
			},
		],
		Mail: [{
				name: 'from',
				type: 'Person'
			},
			{
				name: 'to',
				type: 'Group'
			},
			{
				name: 'contents',
				type: 'string'
			},
		],
		Group: [{
				name: 'name',
				type: 'string'
			},
			{
				name: 'members',
				type: 'Person[]'
			},
		],
	},
	domain: {
		name: 'Ether Mail',
		version: '1',
		chainId: 1,
		verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
	},
	primaryType: 'Mail',
	message: {
		from: {
			name: 'Cow',
			wallets: [
				'0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
				'0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
			],
		},
		to: {
			name: 'Farmers',
			members: [{
				name: 'Bob',
				wallets: [
					'0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
					'0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
					'0xB0B0b0b0b0b0B000000000000000000000000000'
				]
			}]
		},
		contents: 'Hello, Bob!',
	},
}

const withoutGroup = {
	types: {
		EIP712Domain: [{
				name: 'name',
				type: 'string'
			},
			{
				name: 'version',
				type: 'string'
			},
			{
				name: 'chainId',
				type: 'uint256'
			},
			{
				name: 'verifyingContract',
				type: 'address'
			},
		],
		Person: [{
				name: 'name',
				type: 'string'
			},
			{
				name: 'wallets',
				type: 'address[]'
			},
		],
		Mail: [{
				name: 'from',
				type: 'Person'
			},
			{
				name: 'to',
				type: 'Person[]'
			},
			{
				name: 'contents',
				type: 'string'
			},
		],
		Group: [{
				name: 'name',
				type: 'string'
			},
			{
				name: 'members',
				type: 'Person[]'
			},
		],
	},
	domain: {
		name: 'Ether Mail',
		version: '1',
		chainId: 1,
		verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
	},
	primaryType: 'Mail',
	message: {
		from: {
			name: 'Cow',
			wallets: [
				'0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
				'0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
			],
		},
		to: [{
			name: 'Bob',
			wallets: [
				'0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
				'0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
				'0xB0B0b0b0b0b0B000000000000000000000000000'
			]
		}],
		contents: 'Hello, Bob!',
	},
}

console.log(`Hash of message with group is ${ethUtil.bufferToHex(utils.sign(withGroup))}`);
console.log(`Hash of message without group is ${ethUtil.bufferToHex(utils.sign(withoutGroup))}`);
