# -*- coding: utf-8 -*-
from tornado import web

class IndexHandler(web.RequestHandler):
    def get(self):
        self.render("index.html")
