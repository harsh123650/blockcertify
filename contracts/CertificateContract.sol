// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract CertificateSystem {
    struct Certificate {
        string id;
        string mongoId;
    }

    mapping(string => Certificate) private certificates;

    event CertificateAdded(string id, string mongoId);
    event CertificatesAddedInBulk(string[] ids, string[] mongoIds);
    event CertificateDeleted(string id);

    function addCertificatesInBulk(Certificate[] memory _certificates) public {
        string[] memory ids = new string[](_certificates.length);
        string[] memory mongoIds = new string[](_certificates.length);

        for (uint i = 0; i < _certificates.length; i++) {
            require(bytes(certificates[_certificates[i].id].id).length == 0, "Certificate ID already exists"); 
            certificates[_certificates[i].id] = Certificate(_certificates[i].id, _certificates[i].mongoId);
            ids[i] = _certificates[i].id;
            mongoIds[i] = _certificates[i].mongoId;
        }

        emit CertificatesAddedInBulk(ids, mongoIds);
    }

    function addCertificate(string memory _id, string memory _mongoId) public {
        require(bytes(certificates[_id].id).length == 0, "Certificate ID already exists"); 
        certificates[_id] = Certificate(_id, _mongoId);
        emit CertificateAdded(_id, _mongoId);
    }

    function getCertificate(string memory _id) public view returns (Certificate memory) {
        require(bytes(certificates[_id].id).length != 0, "Certificate not found");
        return certificates[_id];
    }

    function deleteCertificate(string memory _id) public {
        require(bytes(certificates[_id].id).length != 0, "Certificate not found");
        
        delete certificates[_id];
        emit CertificateDeleted(_id);
    }
}
