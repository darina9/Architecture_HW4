const createTicket = () => {
    let index = 0;
    return (time) => {
      index += 1;
      return {
        id: index,
        time: time,
      };
    };
  };
  
  const generateCustomer = () => {
    let index = 0;
    return () => {
      index += 1;
      return {
        id: index,
        purchasedTickets: new Set(),
      };
    };
  };
  
  const createTicketStore = (scheduleDates) => {
    const getTicket = createTicket();
    const schedule = new Map();
    scheduleDates.forEach((date) => schedule.set(date, false));
  
    return (selectedTime) => {
      if (schedule.get(selectedTime)) {
        return false; // Билеты на это время уже проданы
      }
      schedule.set(selectedTime, true); // Отмечаем, что билеты на это время проданы
      return getTicket(selectedTime);
    };
  };
  
  function simulateTicketPurchase() {
    const scheduleDates = Array.from({ length: 30 }, (_, idx) => idx + 1);
    const ticketStore = createTicketStore(scheduleDates);
    const createCustomer = generateCustomer();
  
    for (let i = 0; i < scheduleDates.length; i += 1) {
      const customer = createCustomer();
      const selectedTime = scheduleDates[Math.floor(Math.random() * scheduleDates.length)];
      const purchasedTicket = ticketStore(selectedTime);
  
      if (purchasedTicket) {
        customer.purchasedTickets.add(purchasedTicket);
      } else {
        console.log('Извините, все билеты на выбранное время уже проданы.');
      }
  
      console.log(`Покупатель #${customer.id} приобрел билеты:`, customer.purchasedTickets);
    }
  }
  
  simulateTicketPurchase();