// Built by eustia.
window._ = (function()
{
    var _ = {};

    var allKeys = _.allKeys = (function ()
    {
        var allKeys;

        /* function
         *
         * allKeys: Retrieve all the names of object's own and inherited properties.
         * object(object): The object to query.
         * return(array): Returns the array of all property names.
         *
         * ```javascript
         * var obj = Object.create({ a: 0 });
         * obj.b = 1;
         * _.allKeys(obj) // -> ['a', 'b']
         * ```
         *
         * > Members of Object's prototype won't be retrieved.
         *
         */

        allKeys = function (obj)
        {
            var keys = [], key;

            for (key in obj) keys.push(key);

            return keys;
        };

        return allKeys;
    })();

    var inherits = _.inherits = (function ()
    {
        var inherits;

        // @TODO

        /* function
         * inherits: Inherit the prototype methods from one constructor into another.
         * Class(function): Child Class.
         * SuperClass(function): Super Class.
         */

        var objCreate = Object.create;

        function noop() {}

        inherits = function (Class, SuperClass)
        {
            if (objCreate) return Class.prototype = objCreate(SuperClass.prototype);

            noop.prototype  = SuperClass.prototype;
            Class.prototype = new noop();
        };

        return inherits;
    })();

    var has = _.has = (function ()
    {
        var has;

        // @TODO

        /* function
         * has: Checks if key is a direct property.
         * object(object): The object to query.
         * key(string): The path to check.
         * return(boolean): Returns true if key is a direct property, else false.
         */

        var hasOwnProp = Object.prototype.hasOwnProperty;

        has = function (obj, key) { return hasOwnProp.call(obj, key) };

        return has;
    })();

    var restArgs = _.restArgs = (function ()
    {
        var restArgs;

        /* function
         *
         * restArgs: This accumulates the arguments passed into an array, after a given index.
         * function(function): Function that needs rest parameters.
         * startIndex(number): The start index to accumulates.
         * return(function): Generated function with rest parameters.
         *
         * ```javascript
         * var paramArr = _.restArs(function (rest) { return rest });
         * paramArr(1, 2, 3, 4); // -> [1, 2, 3, 4]
         * ```
         */

        restArgs = function (fn, startIdx)
        {
            startIdx = startIdx == null ? fn.length - 1 : +startIdx;

            return function ()
            {
                var len  = Math.max(arguments.length - startIdx, 0),
                    rest = new Array(len);

                for (var i = 0; i < len; i++) rest[i] = arguments[i + startIdx];

                // Call runs faster than apply.
                switch (startIdx)
                {
                    case 0: return fn.call(this, rest);
                    case 1: return fn.call(this, arguments[0], rest);
                    case 2: return fn.call(this, arguments[0], arguments[1], rest);
                }

                var args = new Array(startIdx + 1);

                for (i = 0; i < startIdx; i++) args[i] = arguments[i];

                args[startIdx] = rest;

                return fn.apply(this, args);
            };
        };

        return restArgs;
    })();

    var bind = _.bind = (function ()
    {
        var bind;

        /* function
         *
         * bind: Create a function bound to a given object.
         * function(function): The function to bind.
         * context(*): This binding of given function.
         * [rest](...*): Optional arguments.
         * return(function): Returns the new bound function.
         *
         * ```javascript
         * var fn = _.bind(function (msg)
         * {
         *     console.log(this.name + ':' + msg);
         * }, {name: 'eustia'}, 'I am a utility library.');
         * fn(); // -> 'eustia: I am a utility library.'
         * ```
         */

        bind = restArgs(function (fn, ctx, rest)
        {
            return restArgs(function (callArgs)
            {
                return fn.apply(ctx, rest.concat(callArgs));
            });
        });

        return bind;
    })();

    var slice = _.slice = (function ()
    {
        var slice;

        // @TODO

        var arrProto = Array.prototype;

        slice = function (arr, start, end)
        {
            return arrProto.slice.call(arr, start, end);
        };

        return slice;
    })();

    var endWith = _.endWith = (function ()
    {
        var endWith;

        // @TODO

        /* function
         * endWith: Checks if string ends with the given target string.
         * string(string): The string to search.
         * suffix(string): String suffix.
         * return(boolean):  Returns true if string ends with target, else false.
         */

        endWith = function (str, suffix)
        {
            var idx = str.length - suffix.length;

            return idx >= 0 && str.indexOf(suffix, idx) === idx;
        };

        return endWith;
    })();

    var isBool = _.isBool = (function ()
    {
        var isBool;

        // @TODO

        /* function
         * isBool: Checks if value is classified as a boolean primitive or object.
         * val(*): The value to check.
         * return(boolean): Returns true if value is correctly classified, else false.
         */

        isBool = function (val) { return val === true || val === false };

        return isBool;
    })();

    var _toStr = _._toStr = (function ()
    {
        var _toStr;

        _toStr = Object.prototype.toString;

        return _toStr;
    })();

    var isFn = _.isFn = (function ()
    {
        var isFn;

        // @TODO

        /* function
         * isFn: Checks if value is classified as a Function object.
         * value(*): The value to check.
         * return(boolean): Returns true if value is correctly classified, else false.
         */

        isFn = function (val) { return _toStr.call(val) === '[object Function]' };

        return isFn;
    })();

    var isNum = _.isNum = (function ()
    {
        var isNum;

        // @TODO

        /* function
         * isNum: Checks if value is classified as a Number primitive or object.
         * value(*): The value to check.
         * return(boolean): Returns true if value is correctly classified, else false.
         */

        isNum = function (value) { return _toStr.call(value) === '[object Number]' };

        return isNum;
    })();

    var isInt = _.isInt = (function ()
    {
        var isInt;

        // @TODO

        /* function
         * isInt: Checks if value is classified as a Integer.
         * value(*): The value to check.
         * return(boolean): Returns true if value is correctly classified, else false.
         */

        isInt = function (val) { return isNum(val) && (val % 1 === 0) };

        return isInt;
    })();

    var isObj = _.isObj = (function ()
    {
        var isObj;

        // @TODO

        /* function
         * isObj: Checks if value is the language type of Object.
         * value(*): The value to check.
         * return(boolean): Returns true if value is an object, else false.
         */

        isObj = function (val)
        {
            var type = typeof val;

            return type === 'function' || type === 'object';
        };

        return isObj;
    })();

    var keys = _.keys = (function ()
    {
        var keys;

        // @TODO

        /* function
         * keys: Creates an array of the own enumerable property names of object.
         * object(object): The object to query.
         * return(array): Returns the array of property names.
         */

        var nativeKeys = Object.keys;

        keys = nativeKeys || function (obj)
        {
            var keys = [];

            for (var key in obj) { if (has(obj, key)) keys.push(key) }

            return keys;
        };

        return keys;
    })();

    var isStr = _.isStr = (function ()
    {
        var isStr;

        // @TODO

        /* function
         * isStr: Checks if value is classified as a String primitive or object.
         * value(*): The value to check.
         * return(boolean): Returns true if value is correctly classified, else false.
         */

        isStr = function (value) { return _toStr.call(value) === '[object String]' };

        return isStr;
    })();

    var isUndef = _.isUndef = (function ()
    {
        var isUndef;

        /* function
         *
         * isUndef: Checks if value is undefined.
         * value(*): The value to check.
         * return(boolean): Returns true if value is undefined, else false.
         *
         * ```javascript
         * _.isUndef(void 0) // -> true
         * _.isUndef(null) // -> false
         * ```
         *
         * Just a shortcut for **x === undefined**, doesn't matter that much whether you
         * use it or not.
         */

        isUndef = function (value) { return value === void 0 };

        return isUndef;
    })();

    var last = _.last = (function ()
    {
        var last;

        // @TODO

        /* function
         * last: Gets the last element of array.
         * array(array): The array to query.
         * return(*): Returns the last element of array.
         */

        last = function (arr)
        {
            var len = arr ? arr.length : 0;

            return len ? arr[len - 1] : undefined;
        };

        return last;
    })();

    var repeat = _.repeat = (function ()
    {
        var repeat;

        // @TODO

        /* function
         * repeat: Repeat string n-times.
         * string(string): The string to repeat.
         * n(number): Repeat times.
         * return(string): Repeated string.
         */

        repeat = function (str, n)
        {
            var ret = '';

            if (n < 1) return '';

            while (n > 0)
            {
                if (n & 1) ret += str;
                n >>= 1;
                str += str;
            }

            return ret;
        };

        return repeat;
    })();

    var lpad = _.lpad = (function ()
    {
        var lpad;

        // @TODO

        /* function
         * lpad: Pads string on the left side if it's shorter than length.
         * string(string): The string to pad.
         * length(number): The padding length.
         * chars(string): The string used as padding.
         */

        lpad = function (str, len, chars)
        {
            var strLen = str.length;

            return strLen < len ? repeat(chars, len - strLen) + str : str;
        };

        return lpad;
    })();

    var ltrim = _.ltrim = (function ()
    {
        var ltrim;

        // @TODO

        var regSpace = /^\s+/;

        ltrim = function (str, chars)
        {
            if (chars == null) return str.replace(regSpace, '');

            var start   = 0,
                len     = str.length,
                charLen = chars.length,
                found   = true,
                i, c;

            while (found && start < len)
            {
                found = false;
                i = -1;
                c = str.charAt(start);

                while (++i < charLen)
                {
                    if (c === chars[i])
                    {
                        found = true;
                        start++;
                        break;
                    }
                }
            }

            return (start >= len) ? '' : str.substr(start, len);
        };

        return ltrim;
    })();

    var random = _.random = (function ()
    {
        var random;

        // @TODO

        /* function
         * random: Produces a random number between min and max (inclusive).
         * min(number): The minimum possible value.
         * max(number): The maximum possible value.
         * return(number): Returns the random number.
         */

        random = function (min, max)
        {
            if (max == null)
            {
                max = min;
                min = 0;
            }

            return min + Math.floor(Math.random() * (max - min + 1));
        };

        return random;
    })();

    var pad = _.pad = (function ()
    {
        var pad;

        // @TODO

        /* function
         * pad: Pads string on the left and right sides if it's shorter than length.
         * string(string): The string to pad.
         * length(number): The padding length.
         * chars(string): The string used as padding.
         */

        pad = function (str, len, chars)
        {
            var padLen = len - str.length;

            return repeat(chars, Math.ceil(padLen / 2)) + str +
                   repeat(chars, Math.floor(padLen /2));
        };

        return pad;
    })();

    var rpad = _.rpad = (function ()
    {
        var rpad;

        // @TODO

        /* function
         *
         * rpad: Pads string on the right side if it's shorter than length.
         * string(string): The string to pad.
         * length(number): Padding length.
         * chars(string): String used as padding.
         * return(string): Resulted string.
         */

        rpad = function (str, len, chars)
        {
            var strLen = str.length;

            return strLen < len ? str + repeat(chars, len - strLen): str;
        };

        return rpad;
    })();

    var startWith = _.startWith = (function ()
    {
        var startWith;

        // @TODO

        /* function
         * startWith: Checks if string starts with the given target string.
         * string(string): The string to search.
         * prefix(string): String prefix.
         * return(boolean): Returns true if string starts with prefix, else false.
         */

        startWith = function (str, prefix) { return str.indexOf(prefix) === 0 };

        return startWith;
    })();

    var rtrim = _.rtrim = (function ()
    {
        var rtrim;

        // @TODO

        var regSpace = /\s+$/;

        rtrim = function (str, chars)
        {
            if (chars == null) return str.replace(regSpace, '');

            var end     = str.length - 1,
                charLen = chars.length,
                found   = true,
                i, c;

            while (found && end >= 0)
            {
                found = false;
                i = -1;
                c = str.charAt(end);

                while (++i < charLen)
                {
                    if (c === chars[i])
                    {
                        found = true;
                        end--;
                        break;
                    }
                }
            }

            return (end >= 0) ? str.substring(0, end + 1) : '';
        };

        return rtrim;
    })();

    var isArr = _.isArr = (function ()
    {
        var isArr;

        // @TODO

        /* function
         * isArr: Check if value is classified as an Array Object
         * value(*): The value to check.
         * return(boolean): Returns true if value is correctly classified, else false.
         */

        var nativeIsArr = Array.isArray;

        isArr = nativeIsArr || function (val)
        {
            return _toStr.call(val) === '[object Array]';
        };

        return isArr;
    })();

    var trim = _.trim = (function ()
    {
        var trim;

        // @TODO

        var regSpace = /^\s+|\s+$/g;

        trim = function (str, chars)
        {
            if (chars == null) return str.replace(regSpace, '');

            return ltrim(rtrim(str, chars), chars);
        };

        return trim;
    })();

    var _createAssigner = _._createAssigner = (function ()
    {
        var _createAssigner;

        _createAssigner = function (keysFunc, defaults)
        {
            return function (obj)
            {
                var len = arguments.length;

                if (defaults) obj = Object(obj);

                if (len < 2 || obj == null) return obj;

                for (var i = 1; i < len; i++)
                {
                    var src     = arguments[i],
                        keys    = keysFunc(src),
                        keysLen = keys.length;

                    for (var j = 0; j < keysLen; j++)
                    {
                        var key = keys[j];
                        if (!defaults || isUndef(obj[key])) obj[key] = src[key];
                    }
                }

                return obj;
            };
        };

        return _createAssigner;
    })();

    var extend = _.extend = (function ()
    {
        var extend;

        // @TODO

        extend = _createAssigner(allKeys);

        return extend;
    })();

    var Cookie = _.Cookie = (function ()
    {
        var Cookie;

        // @TODO

        /* module
         * Cookie: Simple api for handling browser cookies.
         */

        var defOpts = { path: '/' };

        var cookie = function (key, val, options)
        {
            if (arguments.length > 1)
            {
                options = extend(defOpts, options);

                if (isNum(options.expires))
                {
                    var expires = new Date();
                    expires.setMilliseconds(expires.getMilliseconds() + options.expires * 864e+5);
                    options.expires = expires;
                }

                val = encodeURIComponent(String(val));
                key = encodeURIComponent(key);

                document.cookie = [
                    key, '=', val,
                    options.expires && '; expires=' + options.expires.toUTCString(),
                    options.path    && '; path=' + options.path,
                    options.domain  && '; domain=' + options.domain,
                    options.secure ? '; secure' : ''
                ].join('');

                return Cookie;
            }

            var cookies = document.cookie ? document.cookie.split('; ') : [],
                result  = key ? undefined : {};

            for (var i = 0, len = cookies.length; i < len; i++)
            {
                var cookie = cookies[i],
                    parts  = cookie.split('='),
                    name   = decodeURIComponent(parts.shift());

                cookie = parts.join('=');
                cookie = decodeURIComponent(cookie);

                if (key === name)
                {
                    result = cookie;
                    break;
                }

                if (!key) result[name] = cookie;
            }

            return result;
        };

        Cookie = {
            /* member
             * Cookie.get: Read cookie.
             * key(string): The cookie name.
             * return(string): Returns cookie value if exists, eles undefined.
             */
            get: cookie,
            /* member
             * Cookie.set: Set cookie.
             * key(string): The cookie name.
             * val(string): The cookie value.
             * options(Object): Options.
             */
            set: cookie,
            remove: function (key, options)
            {
                options = options || {};
                options.expires = -1;
                return cookie(key, '', options);
            }
        };

        return Cookie;
    })();

    var isArrLike = _.isArrLike = (function ()
    {
        var isArrLike;

        // @TODO

        var MAX_ARR_IDX = Math.pow(2, 53) - 1;

        isArrLike = function (val)
        {
            if (!has(val, 'length')) return false;

            var len = val.length;

            return isNum(len) && len >= 0 && len <= MAX_ARR_IDX;
        };

        return isArrLike;
    })();

    var each = _.each = (function ()
    {
        var each;

        // @TODO

        each = function (obj, iteratee, ctx)
        {
            var i, len;

            if (isArrLike(obj))
            {
                for (i = 0, len = obj.length; i < len; i++) iteratee.call(ctx, obj[i], i, obj);
            } else
            {
                var _keys = keys(obj);
                for (i = 0, len = _keys.length; i < len; i++)
                {
                    iteratee.call(ctx, obj[_keys[i]], _keys[i], obj);
                }
            }

            return obj;
        };

        return each;
    })();

    var invert = _.invert = (function ()
    {
        var invert;

        // @TODO

        /* function
         * invert: Creates an object composed of the inverted keys and values of object.
         * object(object): The object to invert.
         * return(object): Returns the new inverted object.
         * If object contains duplicate values, subsequent values overwrite property
         * assignments of previous values unless multiValue is true.
         */

        invert = function (obj)
        {
            var ret = {};

            each(obj, function (val, key) { ret[val] = key });

            return ret;
        };

        return invert;
    })();

    var identity = _.identity = (function ()
    {
        var identity;

        // @TODO

        /* function
         * identity: This method returns the first argument provided to it.
         * value(*): Any value.
         * return(*): Returns value.
         */

        identity = function (value) { return value };

        return identity;
    })();

    var values = _.values = (function ()
    {
        var values;

        // @TODO

        values = function (obj)
        {
            var _keys = keys(obj),
                len   = _keys.length,
                ret   = Array(len);

            for (var i = 0; i < len; i++) ret[i] = obj[_keys[i]];

            return ret;
        };

        return values;
    })();

    var _optimizeCb = _._optimizeCb = (function ()
    {
        var _optimizeCb;

        _optimizeCb = function (func, ctx, argCount)
        {
            if (isUndef(ctx)) return func;

            switch (argCount == null ? 3 : argCount)
            {
                case 1: return function (val)
                {
                    return func.call(ctx, val);
                };
                case 3: return function (val, idx, collection)
                {
                    return func.call(ctx, val, idx, collection);
                };
                case 4: return function (accumulator, val, idx, collection)
                {
                    return func.call(ctx, accumulator, val, idx, collection);
                }
            }

            return function ()
            {
                return func.apply(ctx, arguments);
            };
        };

        return _optimizeCb;
    })();

    var extendOwn = _.extendOwn = (function ()
    {
        var extendOwn;

        // @TODO

        extendOwn = _createAssigner(keys);

        return extendOwn;
    })();

    var isMatch = _.isMatch = (function ()
    {
        var isMatch;

        // @TODO

        isMatch = function (obj, attrs)
        {
            var _keys = keys(attrs),
                len   = _keys.length;

            if (obj == null) return !len;

            obj = Object(obj);

            for (var i = 0; i < len; i++)
            {
                var key = keys[i];
                if (attrs[key] !== obj[key] || !(key in obj)) return false;
            }

            return true;
        };

        return isMatch;
    })();

    var matcher = _.matcher = (function ()
    {
        var matcher;

        // @TODO

        matcher = function (attrs)
        {
            attrs = extendOwn({}, attrs);

            return function (obj)
            {
                return isMatch(obj, attrs);
            };
        };

        return matcher;
    })();

    var _cb = _._cb = (function ()
    {
        var _cb;

        _cb = function (val, ctx, argCount)
        {
            if (val == null) return identity;

            if (isFn(val)) return _optimizeCb(val, ctx, argCount);

            if (isObj(val)) return matcher(val);

            return function (key)
            {
                return function (obj)
                {
                    return obj == null ? undefined : obj[key];
                }
            };
        };

        return _cb;
    })();

    var some = _.some = (function ()
    {
        var some;

        // @TODO

        some = function (obj, predicate, ctx)
        {
            predicate = _cb(predicate, ctx);

            var _keys = !isArrLike(obj) && keys(obj),
                len   = (_keys || obj).length;

            for (var i = 0; i < len; i++)
            {
                var key = _keys ? _keys[i] : i;
                if (predicate(obj[key], key, obj)) return true;
            }

            return false;
        };

        return some;
    })();

    var map = _.map = (function ()
    {
        var map;

        // @TODO

        map = function (obj, iteratee, ctx)
        {
            iteratee = _cb(iteratee, ctx);

            var _keys   = !isArrLike(obj) && keys(obj),
                len     = (_keys || obj).length,
                results = Array(len);

            for (var i = 0; i < len; i++)
            {
                var curKey = _keys ? _keys[i] : i;
                results[i] = iteratee(obj[curKey], curKey, obj);
            }

            return results;
        };

        return map;
    })();

    var toArray = _.toArray = (function ()
    {
        var toArray;

        // @TODO

        var regReStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;

        toArray = function (obj)
        {
            if (!obj) return [];

            if (isArr(obj)) return slice(obj);

            if (isStr(obj)) return obj ? obj.match(regReStrSymbol) : [];

            if (isArrLike(obj)) return map(obj, identity);

            return values(obj);
        };

        return toArray;
    })();

    var Class = _.Class = (function ()
    {
        var Class;

        // @TODO

        /* function
         *
         * Class: Create JavaScript class.
         * methods(object): Public methods.
         * statics(object): Static methods.
         * return(function): Return function used to create instances.
         */

        var regCallSuper = /callSuper/;

        function makeClass(parent, methods, statics)
        {
            statics = statics || {};

            var ctor = function ()
            {
                var args = toArray(arguments);

                if (has(ctor.prototype, 'initialize') &&
                    !regCallSuper.test(this.initialize.toString()) &&
                    this.callSuper)
                {
                    args.unshift('initialize');
                    this.callSuper.apply(this, args);
                    args.shift();
                }

                return this.initialize
                       ? this.initialize.apply(this, args) || this
                       : this;
            };

            inherits(ctor, parent);
            ctor.superclass = ctor.prototype.superclass = parent;

            ctor.extend   = function (methods, statics) { return makeClass(ctor, methods, statics) };
            ctor.inherits = function (Class) { inherits(Class, ctor) };
            ctor.methods  = function (methods) { extend(ctor.prototype, methods); return ctor };
            ctor.statics  = function (statics) { extend(ctor, statics); return ctor };

            ctor.methods(methods).statics(statics);

            return ctor;
        }

        Class = function (methods, statics) { return Base.extend(methods, statics) };

        var Base = Class.Base = makeClass(Object, {
            className: 'Base',
            callSuper: function (name)
            {
                var superMethod = this.superclass.prototype[name];

                if (!superMethod) return;

                return superMethod.apply(this, toArray(arguments).slice(1));
            },
            toString: function ()
            {
                return this.className;
            }
        });

        return Class;
    })();

    var Emitter = _.Emitter = (function ()
    {
        var Emitter;

        // @TODO

        /* class
         * Emitter: Event emitter.
         */

        Emitter = Class({
            initialize: function ()
            {
                this._events = this._events || {};
            },
            on: function (event, listener)
            {
                this._events[event] = this._events[event] || [];
                this._events[event].push(listener);

                return this;
            },
            off: function (event, listener)
            {
                if (!has(this._events, event)) return;

                this._events[event].splice(this._events[event].indexOf(listener), 1);

                return this;
            },
            once: function (event, listener)
            {
                var fired = false;

                function g()
                {
                    this.off(event, g);
                    if (!fired)
                    {
                        fired = true;
                        listener.apply(this, arguments);
                    }
                }

                this.on(event, g);

                return this;
            },
            emit: function (event)
            {
                if (!has(this._events, event)) return;

                var args = slice(arguments, 1);

                each(this._events[event], function (val)
                {
                    val.apply(this, args);
                }, this);

                return this;
            }
        }, {
            mixin: function (obj)
            {
                each(['on', 'off', 'once', 'emit'], function (val)
                {
                    obj[val] = Emitter.prototype[val];
                });

                obj._events = obj._events || {};
            }
        });

        return Emitter;
    })();

    var State = _.State = (function ()
    {
        var State;

        // @TODO

        function buildEvent(name, event)
        {
            var from = event.from,
                to   = event.to;

            if (!isArr(from)) from = [from];

            return function ()
            {
                var args = slice(arguments, 1);
                args.unshift(name);
                if (some(from, function (val) {return this.current === val}, this))
                {
                    this.current = to;
                    this.emit.apply(this, args);
                }
            };
        }

        State = Emitter.extend({
            className: 'State',
            initialize: function (initial, events)
            {
                this.current = initial;

                var self = this;

                each(events, function (event, key)
                {
                    self[key] = buildEvent(key, event);
                });
            },
            is: function (state) { return this.current === state }
        });

        return State;
    })();

    return _;
})();