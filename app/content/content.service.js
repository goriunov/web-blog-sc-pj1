"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var content_1 = require("../shared/content");
var ContentService = (function () {
    function ContentService() {
        this.articles = [
            new content_1.Content('Mock Data', 'Departure so attention pronounce satisfied daughters am. But shy tedious pressed studied opinion entered windows off. Advantage dependent suspicion convinced provision him yet. Timed balls match at by rooms we. Fat not boy neat left had with past here call. ', 'http://www.computerworld.in/sites/default/files/news/2012/08/IT-bank_0.jpg', 'Dmitrii Goriunov', 'Departure so attention pronounce satisfied daughters am. But shy tedious pressed studied opinion entered windows off. Advantage dependent suspicion convinced provision him yet. Timed balls match at by rooms we. Fat not boy neat left had with past here call. ', ['Networking', 'DataBase']),
            new content_1.Content('Mock Data', 'Departure so attention pronounce satisfied daughters am. But shy tedious pressed studied opinion entered windows off. Advantage dependent suspicion convinced provision him yet. Timed balls match at by rooms we. Fat not boy neat left had with past here call. ', 'http://previews.123rf.com/images/alexskopje/alexskopje1203/alexskopje120300572/12827101-Programing-Stock-Photo-program-code.jpg', 'Dmitrii Goriunov', 'something', ['WebDev', 'Software'])
        ];
    }
    ContentService.prototype.getContent = function () {
        return this.articles;
    };
    ContentService.prototype.getSingleContent = function (id) {
        return this.articles[id];
    };
    ContentService.prototype.addContent = function (content) {
        this.articles.push(content);
    };
    ContentService.prototype.editContent = function (oldArticleID, newArticle) {
        this.articles[oldArticleID] = newArticle;
    };
    ContentService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ContentService);
    return ContentService;
}());
exports.ContentService = ContentService;
//# sourceMappingURL=content.service.js.map