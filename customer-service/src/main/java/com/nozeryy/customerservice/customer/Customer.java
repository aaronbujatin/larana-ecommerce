package com.nozeryy.customerservice.customer;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
@Document
public class Customer {

    @Id
    private String id;
    private String fistName;
    private String lastName;
    private String email;
    private Address address;

}
