# -*- coding: utf-8 -*-

import os.path

from tornado import httpserver, ioloop, web
from handlers import IndexHandler

ROOT = os.path.dirname(__file__)

class Application(web.Application):
    def __init__(self):

        # Handlers
        handlers = [
            (r"/", IndexHandler)
        ]

        SETTINGS = dict(
            template_path = os.path.join(ROOT, 'templates'),
            static_path = os.path.join(ROOT, 'static'),

            debug = True
        )

        super(Application, self).__init__(handlers, **SETTINGS)


def main():
    http_server = httpserver.HTTPServer(Application())
    http_server.listen(8888)
    ioloop.IOLoop.current().start()

if __name__ == "__main__":
    main()
