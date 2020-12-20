let customers = [
  { id: 1, name: "customer1", email: "customer1@test.com" },
  { id: 2, name: "customer2", email: "customer2@test.com" },
  { id: 3, name: "customer3", email: "customer3@test.com" },
  { id: 4, name: "customer4", email: "customer4@test.com" },
];

class DB {
  getCustomer = (id) => {
    return (customer = customers.find((C) => C.id === id));
  };
}
const db = new DB();
class Email {
  emailSent = false;

  sendEmail = (customer, message) => {
    let found = db.getCustomer(customer.id);
    if (customer && message) {
      this.emailSent = true;
      return this.emailSent;
    }
    return this.emailSent;
  };
}

const email = new Email();

function notifyCustomer(customer) {
  email.sendEmail(customer.email, "Hello Message ");
}

describe(" notifyCustomer ", () => {
  it("test notifyCustomer", () => {
    db.getCustomer = jest
      .fn()
      .mockReturnValue({ id: 1, name: "test", email: "test@test.com" });
    email.sendEmail = jest.fn();
    notifyCustomer({ id: 1, email: "test@test.com" });
    let message = "Hello Message ";
    expect(email.sendEmail).toHaveBeenCalled();
    expect(email.sendEmail).toHaveBeenCalledWith("test@test.com", message);
  });
});
