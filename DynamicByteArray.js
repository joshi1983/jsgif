/**
 * This class represents an array of bytes in a compact, memory-efficient format.
 * This was written to be used by GIFEncoder so it could encode larger GIF files than possible with a non-typed Array of number.
 * @author Josh Greig
 */
function DynamicByteArray() {
	var arr = new Uint8Array(1000);
	var len = 0;

	function expandCapacity() {
		var newCapacity = arr.length * 2;
		// If the capacity is huge, the risk of running out of memory is higher
		// so we want to expand in 50% intervals instead of 100% intervals.
		if (newCapacity > 50000000) {
			newCapacity = arr.length * 1.5;
		}
		var newArr = new Uint8Array(newCapacity);
		for (let i = 0; i < arr.length; i++) {
			newArr[i] = arr[i];
		}
		arr = newArr;
	}

	DynamicByteArray.prototype.get = function(index) {
		return arr[index];
	};

	DynamicByteArray.prototype.getLength = function() {
		return len;
	}

	DynamicByteArray.prototype.toCompactUint8Array = function() {
		if (arr.length !== len) {
			const result = new Uint8Array(len);
			for (let i = 0; i < len; i++) {
				result[i] = arr[i];
			}
			arr = result;
		}
		return arr;
	};

	DynamicByteArray.prototype.writeByte = function(val) {
		if (len >= arr.length) {
			expandCapacity();
		}
		arr[len++] = val;
	};
}