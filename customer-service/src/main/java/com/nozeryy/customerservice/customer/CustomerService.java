package com.nozeryy.customerservice.customer;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    public CustomerResponse createCustomer(CustomerRequest customerRequest) {
        var customer = customerRepository.save(customerMapper.toCustomer(customerRequest));
        return customerMapper.toCustomerResponse(customer);
    }

    public List<CustomerResponse> getAllCustomer() {
        return customerRepository.findAll().stream()
                .map(customerMapper::toCustomerResponse)
                .toList();
    }

    public CustomerResponse getCustomerById(String customerId) {
        return customerRepository.findById(customerId);
    }
}
