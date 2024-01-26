class Page:
    def __init__(self, data):
        self.data = data

    def __getattr__(self, name: str) -> str:
        if name in self.data["properties"]:
            return self.data["properties"][name]["title"][0]["plain_text"]
        raise AttributeError(f"'{type(self).__name__}' object has no attribute '{name}'")

    def __setattr__(self, name, value):
        if name in self.data["properties"]:
            self.data["properties"][name]["title"][0]["plain_text"] = value
        else:
            super().__setattr__(name, value)

    # def patch(self):
    #     notion.pages.update(page_id=self.data["id"], properties=self.data["properties"])

    # def delete(self):
    #     notion.pages.delete(page_id=self.data["id"])