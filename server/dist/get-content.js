"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var youtube_v3_api_1 = require("youtube-v3-api");
var twitch_1 = __importDefault(require("twitch"));
var YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
var youtubeAPI = new youtube_v3_api_1.YoutubeDataAPI(YOUTUBE_API_KEY);
var TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
var TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
var getYoutubeVideos = function () { return __awaiter(_this, void 0, void 0, function () {
    var doubleliftVids, iwdVids, content, i, doubleliftVid, iwdVid;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, youtubeAPI.searchAll('Doublelift', 5, { type: 'video', channelId: 'UCrPCP1oaOr0AEs2JdxzfOFA' })];
            case 1:
                doubleliftVids = _a.sent();
                return [4 /*yield*/, youtubeAPI.searchAll('IWDominate', 5, { type: 'video', channelId: 'UCmEu9Y8nodUV0jvsR9NYLJA' })];
            case 2:
                iwdVids = _a.sent();
                content = [];
                for (i = 0; i < iwdVids.items.length; i++) {
                    doubleliftVid = {
                        'type': 'youtube-video',
                        'videoId': doubleliftVids.items[i].id.videoId,
                        'title': doubleliftVids.items[i].snippet.title,
                        'thumbnailUrl': doubleliftVids.items[i].snippet.thumbnails.default.url,
                        'creatorName': doubleliftVids.items[i].snippet.channelTitle.toLowerCase(),
                        'createdAt': doubleliftVids.items[i].snippet.publishedAt,
                        'embedLink': "https://www.youtube.com/embed/" + doubleliftVids.items[i].id.videoId
                    };
                    iwdVid = {
                        'type': 'youtube-video',
                        'videoId': iwdVids.items[i].id.videoId,
                        'title': iwdVids.items[i].snippet.title,
                        'thumbnailUrl': iwdVids.items[i].snippet.thumbnails.default.url,
                        'creatorName': iwdVids.items[i].snippet.channelTitle.toLowerCase(),
                        'createdAt': iwdVids.items[i].snippet.publishedAt,
                        'embedLink': "https://www.youtube.com/embed/" + iwdVids.items[i].id.videoId
                    };
                    content.push(doubleliftVid);
                    content.push(iwdVid);
                }
                return [2 /*return*/, content];
        }
    });
}); };
var getTwitchClips = function () { return __awaiter(_this, void 0, void 0, function () {
    var twitchClient, doubleliftRequest, nb3Request, doubleliftClips, nb3Clips, content, i, doubleliftClip, nb3Clip;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, twitch_1.default.withClientCredentials(TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET)];
            case 1:
                twitchClient = _a.sent();
                doubleliftRequest = twitchClient.helix.clips.getClipsForBroadcaster('40017619');
                nb3Request = twitchClient.helix.clips.getClipsForBroadcaster('26946000');
                return [4 /*yield*/, doubleliftRequest.getNext()];
            case 2:
                doubleliftClips = _a.sent();
                return [4 /*yield*/, nb3Request.getNext()];
            case 3:
                nb3Clips = _a.sent();
                content = [];
                for (i = 0; i < 5; i++) {
                    doubleliftClip = {
                        'type': 'twitch-clip',
                        'videoId': doubleliftClips[i].id,
                        'title': doubleliftClips[i].title,
                        'thumbnailUrl': doubleliftClips[i].thumbnailUrl,
                        'creatorName': doubleliftClips[i].broadcasterDisplayName.toLowerCase(),
                        'createdAt': doubleliftClips[i].creationDate,
                        'embedLink': doubleliftClips[i].embedUrl + "&autoplay=false"
                    };
                    nb3Clip = {
                        'type': 'twitch-clip',
                        'videoId': nb3Clips[i].id,
                        'title': nb3Clips[i].title,
                        'thumbnailUrl': nb3Clips[i].thumbnailUrl,
                        'creatorName': nb3Clips[i].broadcasterDisplayName.toLowerCase(),
                        'createdAt': nb3Clips[i].creationDate,
                        'embedLink': nb3Clips[i].embedUrl + "&autoplay=false"
                    };
                    content.push(doubleliftClip);
                    content.push(nb3Clip);
                }
                return [2 /*return*/, content];
        }
    });
}); };
/**
 * Randomize array element order in-place.
 * Using Durstenfeld (computer-optimized Fisher-Yates) shuffle algorithm.
 * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
var shuffleArray = function (content) {
    var _a;
    // Don't want to update original array..
    var array = content;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
    }
    return array;
};
exports.getContent = function () { return __awaiter(_this, void 0, void 0, function () {
    var twitchContent;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getTwitchClips()];
            case 1:
                twitchContent = _a.sent();
                //const content = youtubeContent.concat(twitchContent);
                return [2 /*return*/, shuffleArray(twitchContent)];
        }
    });
}); };
/*
TODO: convert this to class
*/ 
