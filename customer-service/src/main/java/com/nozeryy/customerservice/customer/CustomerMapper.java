package com.nozeryy.customerservice.customer;

import org.springframework.stereotype.Service;

@Service
public class CustomerMapper {


    public Customer toCustomer(CustomerRequest customerRequest) {
        return Customer.builder()
                .fistName(customerRequest.firstName())
                .lastName(customerRequest.lastName())
                .email(customerRequest.email())
                .address(
                        Address.builder()
                                .street(customerRequest.address().getStreet())
                                .houseNumber(customerRequest.address().getHouseNumber())
                                .zipCode(customerRequest.address().getZipCode())
                                .build()
                )
                .build();
    }

    public CustomerResponse toCustomerResponse(Customer customer) {
        return new CustomerResponse(
                customer.getId(),
                customer.getFistName(),
                customer.getLastName(),
                customer.getEmail(),
                customer.getAddress()
        );
    }
}
