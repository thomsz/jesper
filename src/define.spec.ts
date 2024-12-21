import define from "@/define";

export interface User {
  id: string;
  name: string;
}

describe("define", () => {
  it("should return created entity", () => {
    const userSample: User = {
      id: "fake-id",
      name: "Fake Name",
    };

    const create = define({
      user: userSample,
    });

    const user = create("user");
    expect(user).toEqual(userSample);
  });
});
